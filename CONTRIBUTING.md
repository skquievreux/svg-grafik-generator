# Development Guidelines

## Branching Strategy
- **NEVER push directly to `main`**.
- Always create a feature branch (e.g., `feat/my-feature`, `fix/bug-name`) for your changes.
- Push the feature branch to `origin`.
- Vercel will automatically build preview deployments for these branches.
- Merge to `main` only via Pull Request or after explicit verification.

## Workflow
1. Sync `main`: `git checkout main && git pull origin main`
2. Create Branch: `git checkout -b feat/your-feature`
3. Commit & Push: `git add . && git commit -m "..." && git push -u origin feat/your-feature`
