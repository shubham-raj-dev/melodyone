# Agent Skills for LiquidBeats

This project uses production-grade engineering skills from [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills).

Skills are in `skills/<name>/SKILL.md`. The built-in `skill` tool loads them.

## Core Rules

- If a task matches a skill, you MUST invoke it via the `skill` tool
- Never implement directly if a skill applies
- Always follow the skill instructions exactly (do not partially apply them)
- Skills are selected automatically based on intent — no slash commands needed

## Intent → Skill Mapping

| Intent | Skill(s) |
|--------|----------|
| Feature / new functionality | `spec-driven-development` → `incremental-implementation` + `test-driven-development` |
| Planning / breakdown | `planning-and-task-breakdown` |
| Bug / failure / unexpected behavior | `debugging-and-error-recovery` |
| Code review | `code-review-and-quality` |
| Refactoring / simplification | `code-simplification` |
| API or interface design | `api-and-interface-design` |
| UI work | `frontend-ui-engineering` |
| Idea / requirements gathering | `interview-me` → `idea-refine` |
| Security review | `security-and-hardening` |
| Performance optimization | `performance-optimization` |
| Git / versioning | `git-workflow-and-versioning` |
| Shipping / launch | `shipping-and-launch` |
| Documentation | `documentation-and-adrs` |
| CI/CD | `ci-cd-and-automation` |
| Testing | `test-driven-development` |

## Lifecycle (Implicit)

- DEFINE → `spec-driven-development`
- PLAN → `planning-and-task-breakdown`
- BUILD → `incremental-implementation` + `test-driven-development`
- VERIFY → `debugging-and-error-recovery`
- REVIEW → `code-review-and-quality`
- SHIP → `shipping-and-launch`

## Execution Model

For every request:

1. Determine if any skill applies (even 1% chance)
2. Invoke the appropriate skill using the `skill` tool
3. Follow the skill workflow strictly
4. Only proceed to implementation after required steps (spec, plan, etc.) are complete

## Anti-Rationalization

The following thoughts are incorrect and must be ignored:

- "This is too small for a skill"
- "I can just quickly implement this"
- "I'll gather context first"

Correct behavior: Always check for and use skills first.

## References

Supplementary checklists are in `references/`:

- `definition-of-done.md` — standing quality bar
- `testing-patterns.md` — test structure and conventions
- `performance-patterns.md` — web performance guidelines
- `security-patterns.md` — security checklist
- `accessibility-patterns.md` — a11y checklist
- (and more)

## Personas

Reusable agent personas are in `agents/`:

- `code-reviewer.md` — structured code review
- `test-engineer.md` — test-first approach
- `security-auditor.md` — vulnerability detection
- `web-performance-auditor.md` — Core Web Vitals audit
