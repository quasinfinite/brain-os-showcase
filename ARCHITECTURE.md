# Public Architecture

This document describes Brain at a product level. It deliberately excludes private prompts, personal knowledge, internal governance contracts, credentials, paths, and proprietary implementation history.

## Operating flow

```text
User intent
    |
    v
Brain operating interface
    |
    +--> Maintained knowledge and project context
    +--> Decision and evidence records
    +--> Specialized persona perspectives
    +--> Current work and acceptance state
    |
    v
Bounded reasoning or authorized execution
    |
    v
Verification, review, and durable continuity
```

## Separation of responsibilities

### Knowledge

Maintained information provides continuity. Source material, synthesis, and uncertainty are treated as different kinds of information rather than blended together.

### Perspectives

Specialized personas provide focused analysis. They do not independently redefine project truth, grant authority, or replace evidence.

### Decisions

Important choices can retain their alternatives, constraints, rationale, and acceptance state so later work does not depend on conversational memory alone.

### Execution

Implementation follows explicit authorization and bounded scope. Results are verified in proportion to their risk before being treated as complete.

### Diagnostics

The system can inspect structure, information quality, contradictions, freshness, and resource use. Diagnostic work is separated from ordinary decision-making and is read-only by default.

### Public presentation

The interactive files in this repository are a synthetic presentation layer. They demonstrate how the operating model can feel without exposing or connecting to the private system.

## Current demonstration stack

- Semantic HTML
- Responsive CSS
- Dependency-free JavaScript
- Fictional in-memory graph data
- No backend, model connection, persistence, or analytics

## Production boundary

A production deployment would require authenticated access, encrypted storage, strict tenant and context isolation, audit logging, secret management, recovery controls, monitoring, and a reviewed authorization model. Those capabilities are not implied by this static showcase.
