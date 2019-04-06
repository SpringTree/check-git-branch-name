# Check git branch name

We use [git flow AVH](https://github.com/petervanderdoes/gitflow-avh) within our company as a git branching strategy.
This package provided a module to validate the current git branch against that naming policy.
Recommended use is to perform the check in a [Husky](https://github.com/typicode/husky) prepush hook.

You can install this module in your project:

```bash
npm i -D @springtree/check-git-branch-name
```

or run it once with `npx`:

```bash
npx @springtree/check-git-branch-name
```

## Even releases check

Most of mobile app project use an odd/even version approach.
Development builds are odd minor versions and master/releases are even.
By providing the `--evenReleases` or `-e` switch this can also be checked.

## Custom checks

If you just want to check if a branch name you are considering is valid use the `--test` or `-t` switch:

```bash
npx @springtree/check-git-branch-name -t master
```

## SpringTree coding guidelines tool

Our [Coding guidelines](https://github.com/SpringTree/coding-guidelines) repository has a command-line tool we use to install our linting setup.
It can also be used to install and setip the git branch check:

```bash
npx @springtree/coding-guidelines --gitflow
```

It will install with the even releases check enabled by default.
