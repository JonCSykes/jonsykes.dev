---
title: "Weavemind Guide"
cover: "/opengraph.png"
summary: "Implementing a Weavemind agent with configuration, memory, tools, and integrations."
date: "2026-02-03"
isDraft: false
---

# A Comprehensive Guide

This guide will walk you through implementing an agent using Weavemind, covering key concepts, configurations, and integration with other systems.

## What is an Agent?

In the context of Weavemind, an agent is an autonomous system that can:

- Process user requests
- Plan and execute steps to fulfill those requests
- Use tools to gather information or perform actions
- Maintain memory of past interactions
- Provide final answers to user queries

### Agent Configuration Requirements

To create a functional agent, you need to configure:

1. **LLM Configuration**: The language model that powers the agent's reasoning
2. **Tools**: Functions the agent can call to perform actions
3. **Memory**: Short-term and long-term storage for context
4. **Prompt Templates**: Instructions that guide the agent's behavior
5. **Planning**: Strategy for breaking down complex tasks

Here's a basic example of creating an agent:

```go
agent, err := agent.NewAgent(
    ctx,
    agent.Config {
        ExcludeBaseTools: true,
        PlanningInterval: 5,
        MaxIterations:    100,
        Name:
        "my-agent",
    },
    "MyContextID",
    agent.WithLLMConfig(&chatConfig),
    agent.WithPlanningLLMConfig(&planningConfig),
    agent.WithFunctionCallingLLMConfig(&chatConfig),
    agent.WithLogger(logger),
    agent.WithTool(myTool1, myTool2),
)
```

## ContextID

ContextID is a string identifier that serves as a crucial parameter when creating a new agent in Weavemind. It acts as a persistent identifier that groups related agent sessions and their associated memories, enabling continuity across multiple interactions.

```go
agent, err := agent.NewAgent(
    ctx,
    agentConfig,
    "MyContextID",
    options...)
```

## Purpose of ContextID

The primary purposes of ContextID are:

1. **Memory Organization**: ContextID organizes memory by grouping related interactions under a common identifier.

2. **Persistent Context**: It enables agents to maintain context across multiple sessions by associating memories with the same ContextID.

3. **Multi-User Support**: Different users or conversations can have separate memory spaces by using different ContextIDs.

4. **Knowledge Compartmentalization**: It allows for domain-specific knowledge to be isolated and retrieved efficiently.

## How ContextID is Used in Weavemind

### Agent Initialization

When creating a new agent, ContextID is a required parameter:

```go
if contextID == "" {
    return nil, errors.New("contextID is required to create an agent")
}
```

### Memory Management

ContextID is passed to the Memory system as `globalContextID`:

```go
memory: memory.NewMemory(contextID, sessionID, agentCache, agentVector)
```

### Long-Term Memory

In the long-term memory system, ContextID is used to:

1. **Filter Vector Database Searches**: When retrieving relevant memories, the system filters by ContextID:

```go
results, err := m.longTerm.vector.Search(
	ctx,
	queryPrompt,
    map[string]any{
        "global_context_id": m.longTerm.globalContextID,
    },
    VectorSearchLimit,
)
```

2. **Tag Stored Memories**: When committing memories to long-term storage, they're tagged with the ContextID:

```go
metadata := map[string]any{
    "global_context_id": m.longTerm.globalContextID,
    "session_id":        m.shortTerm.sessionID.String(),
}
```

## Prompt Templating

Prompt templates are structured instructions that guide the agent's behavior. Weavemind provides default templates for various functions and allows customization.

### Default Templates

Weavemind includes several default templates:

1. **System Prompt**: The main instructions for the agent that define its capabilities, constraints, and how to use tools.

2. **Planning Templates**:
   - **Initial Facts Prompt**: Identifies known facts given in the task and facts that need to be looked up or derived. This helps the agent understand what information it has and what it needs to discover.
   - **Initial Plan Prompt**: Creates a step-by-step plan based on the task and available tools. This establishes the agent's strategy for solving the problem.
   - **Updated Facts Prompt**: Revises facts based on new information gathered during execution. This ensures the agent's knowledge stays current as it learns more.
   - **Updated Plan Prompt**: Adjusts the plan as needed based on new facts and progress. This allows the agent to adapt its strategy as circumstances change.
   - **Response Prompt**: Formats the final answer when the agent has completed its task or needs to provide a response.

3. **Memory Templates**:
   - **Store Memory Prompt**: Formats information (user prompt, facts, plan, and final answer) for storage in long-term memory. This template structures how experiences are recorded for future reference.
   - **Query Memory Prompt**: Constructs queries to retrieve relevant memories based on the current context (task, facts, and plan). This helps the agent leverage past experiences for current tasks.

### Creating Custom Templates

You can create custom templates by implementing the `template.PromptTemplates` interface:

```go
customTemplates := &template.PromptTemplates{
    PromptTemplate: make(map[string]template.PromptTemplate),
}

customTemplates.Add("my_custom_prompt", template.PromptTemplate{
    Prompt: &template.Prompt{
        SystemText: "My custom system instructions",
	    UserText:   "Template for user message with {{.Variable}}",
	    StopWords:  []string{"STOP"},
    },
})

// Apply custom templates to your agent
agent.WithPlanningPromptTemplate(customTemplates)
```

## Memory in Weavemind

Memory allows agents to maintain context across interactions and learn from past experiences.

### Short-term vs Long-term Memory

1. **Short-term Memory**:
   - Implemented using a cache system (default: Theine)
   - Stores recent interactions and context for the current session
   - Automatically managed during the agent's execution
   - Accessible via memory keys like `memory.PlanMemoryKey`

2. **Long-term Memory**:
   - Implemented using a vector database
   - Stores embeddings of past interactions for semantic retrieval
   - Persists across sessions
   - Used for retrieving relevant past experiences

### Using Memory

Memory is automatically managed by the agent, but you can customize its behavior:

```go
// Configure memory with custom cache and vector options
agent.WithCacheConfig(&cacheConfig)
agent.WithVectorConfig(&vectorConfig)
agent.WithMemoryPromptTemplate(customMemoryTemplates)
```

The agent stores and retrieves memories during execution:

```go
// Memory is stored automatically during agent execution
err = agent.memory.Set(ctx, memory.PlanMemoryKey, "This is my plan")

// Retrieve memory
planMemory, err := agent.memory.Get(ctx, memory.PlanMemoryKey)

// Access long-term context
historicalContext, err := agent.memory.LongTermContext(ctx)
```

## Tool Calling

Tools are functions that the agent can call to interact with external systems or perform specific actions.

### How Tool Calling Works

1. The agent receives a task
2. It plans which tools to use
3. It calls tools with specific parameters
4. It processes the results and decides next steps
5. It may call additional tools or provide a final answer

### Configuring Tools

Tools are added to the agent during initialization:

```go
// Create tools
braveTool := brave.NewTool(braveSearchAPIKey, nil)
serverDateTool := serverdate.NewTool()
finalAnswerTool := finalanswer.NewTool()

// Add tools to the agent
agent, err := agent.NewAgent(
    ctx,
    agentConfig,
    "MyContextID",
    agent.WithTool(braveTool, serverDateTool, finalAnswerTool),
)
```

### Creating New Tools

To create a custom tool, implement the `schema.Tooler` interface:

```go
type MyTool struct {
    // Tool properties
}

func NewMyTool() *MyTool {
    return &MyTool{}
}

func (t *MyTool) Execute(ctx context.Context, params map[string]any) (*schema.MessageContent, error) {
    // Implement tool functionality
    return schema.NewTextContent("Tool result"), nil
}

func (t *MyTool) GetFunction() schema.Function {
    return schema.Function{
        Name: "my_tool",
        Description: "Description of what my tool does",
        Parameters: map[string]schema.Parameter{
            "param1": {
                Type:        "string",
                Description: "Description of parameter",
                Nullable:    false,
            },
        },
    }
}
```

You can find more tool examples at: https://github.com/weave-labs/tools

## LLM Package

The LLM package is the core of the agent's reasoning capabilities.

### How the LLM Package is Used

The agent uses the LLM package for:

1. Planning steps to solve a task
2. Deciding which tools to call
3. Processing tool results
4. Generating the final answer

### Configuring the LLM

Weavemind uses three different LLM configurations for specialized purposes:

1. **Main LLM Config** (`WithLLMConfig`): The primary configuration used for general reasoning and responses. This is the default configuration used when a more specialized configuration is not available.

2. **Planning LLM Config** (`WithPlanningLLMConfig`): Specifically optimized for planning tasks, including:
   - Generating initial facts about what is known and unknown
   - Creating step-by-step plans to solve tasks
   - Updating facts based on new information
   - Revising plans as the agent progresses

3. **Function Calling LLM Config** (`WithFunctionCallingLLMConfig`): Specialized for tool/function calling operations, including:
   - Deciding which tools to call
   - Formatting parameters for tool calls
   - Processing tool results
   - Determining next steps based on tool outputs

Each configuration can be customized with different models, parameters, and settings:

```go
chatConfig := chat.Config{
    Model:       "gpt-4o",           // The model to use
    APIKey:      apiKey,             // API key for the model provider
    Temperature: 0.7,                // Controls randomness (0.0-1.0)
    MaxTokens:   2000,               // Maximum tokens in the response
    StopWords:   []string{"STOP"},   // Words that signal the end of generation
    ToolChoice:  "auto",             // How tools are selected ("auto" or "required")
}

// Apply different configurations for different purposes
agent.WithLLMConfig(&chatConfig)
// Planning-specific
reasoningagent.WithPlanningLLMConfig(&planningConfig)
// Tool calling operations
tasksagent.WithFunctionCallingLLMConfig(&functionConfig)

```

You might want to use different settings for each configuration:

- Use lower temperature (e.g., 0.2) for planning to get more deterministic plans
- Use higher temperature (e.g., 0.7) for function calling to allow more creative tool usage
- Use different models for different tasks based on their strengths

The LLM package supports various models and configurations. For more details, see: https://github.com/weave-labs/llm

## Upcoming Features

Weavemind is actively developing several exciting features:

1. **Orchestrator**: A primary agent that can spin up and manage multiple agents for a single request, enabling complex workflows and delegation.

2. **Long-term Memory Loading**: The ability to load relevant long-term memories at the start of an agent run, improving context awareness.

3. **MCP Integration**: Integration with Model Context Protocol (MCP) for centralized tool calls and management of multiple agents. MCP provides a standardized way for agents to communicate with tools and services.

4. **Protobuf Support**: Implementation of Protocol Buffers with entities and APIs for more efficient communication.

## Implementing RAG Outside of Weavemind

Retrieval-Augmented Generation (RAG) is a technique that enhances LLM responses by retrieving relevant information from a knowledge base.

### What is RAG Used For?

RAG is used to:

- Ground LLM responses in factual information
- Provide domain-specific knowledge
- Reduce hallucinations
- Keep information up-to-date

### Implementing RAG with Weave-Kit Vector

The Vector library in Weave-Kit provides tools for implementing RAG:

#### Using pgvector for Local Development

For local RAG development, you can use pgvector running in Docker:

````bash
# Start a PostgreSQL container with pgvector extension
docker run -d \  --name postgres-pgvector \  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=vectordb \
  -p 5432:5432 \  ankane/pgvector```

Then configure your vector database to use pgvector:

```go
vectorConfig := &vector.Config{
    Kind: vector.Postgres,
    Postgres: postgres.Config{
        Host:     "localhost",
        Port:     5432,
        User:     "postgres",
        Password: "postgres",
        Database: "vectordb",
        Table:    "embeddings",    },
}

vectorDB, err := vector.NewVector(ctx, vectorConfig)
````

#### Using Cloud Vector Databases

For production environments, you can use cloud-based vector databases like Pinecone:

```go
vectorConfig := &vector.Config{
    Kind: vector.Pinecone,
    Pinecone: pinecone.Config {
        APIKey:     pineconeAPIKey,
        Environment: "us-west1-gcp",
        ProjectName: "my-project",    },
}

vectorDB, err := vector.NewVector(ctx, vectorConfig)
```

2. **Index Documents**:

```go
// Create embeddings for your documents
embeddings, err := llm.CreateEmbeddings(ctx, documents)

// Store in vector database
err = vectorDB.Store(ctx, embeddings)
```

3. **Query for Relevant Information**:

```go
// Create embedding for the query
queryEmbedding, err := llm.CreateEmbedding(ctx, query)

// Search for similar documents
results, err := vectorDB.Search(ctx, queryEmbedding, 5)
```

4. **Enhance LLM Prompt with Retrieved Information**:

```go
enhancedPrompt := fmt.Sprintf(
	"Answer based on this information: %s\n\nQuestion: %s",
    results.JoinContent(),
    query,
)

// Send to LLM
response, err := llm.Complete(ctx, enhancedPrompt)
```

For a complete example, refer to: https://github.com/weave-labs/weave-kit/blob/main/examples/simplerag/simplerag.go

## Integration with Frontend (SvelteKit)

To integrate Weavemind with a SvelteKit frontend:

1. **Create a Go API Backend**:

```go
func handleAgentRequest(w http.ResponseWriter, r *http.Request) {
    // Parse request
    var req AgentRequest
    json.NewDecoder(r.Body).Decode(&req)

    // Initialize agent
    agent, err := agent.NewAgent(...)

    // Run agent
    response, err := agent.Run(r.Context(), req.Query, nil)

    // Return response
    json.NewEncoder(w).Write(response)
}
```

2. **Create SvelteKit Frontend**:

```typescript
// src/routes/agent/+page.svelte
<script>
  async function queryAgent(query) {
    const response = await fetch('/api/agent', {
      method: 'POST',
      body: JSON.stringify({ query }),
      headers: { 'Content-Type': 'application/json' }
    });

    return await response.json();
  }

  let query = '';
  let result = '';
  async function handleSubmit() {
    result = 'Thinking...';
    result = await queryAgent(query);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={query} placeholder="Ask the agent...">
  <button type="submit">Submit</button>
</form>

<div class="result">
  {#if result}
    <p>{result}</p>
  {/if}
</div>
```

3. **Set Up API Routes in SvelteKit**:

```javascript
// src/routes/api/agent/+server.js
export async function POST({ request }) {
  const { query } = await request.json();

  const response = await fetch("http://your-go-backend/agent", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { "Content-Type": "application/json" },
  });

  const result = await response.json();
  return new Response(JSON.stringify(result));
}
```
