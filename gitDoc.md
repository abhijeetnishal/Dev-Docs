### Error on pull
1. If git throwing this error: fatal: refusing to merge unrelated histories, run:
```bash
    git pull origin <branch_name> --allow-unrelated-histories
```

### Clone repo apart from main or default branch:
```bash
    git clone -b <branch-name> <repository-url>

    //e.g.->
    git clone -b feature/dashboard https://github.com/dotEYElabs/cross-web-interface.git
```

### How to switch branch from current branch with some changes to master branch
```js
//commit the changes
git add .
git commit -m "Commit message describing your changes"

//Switch to the master branch
git checkout master

//Merge changes
git merge <your_previous_branch_name>

//Verify changes
git status
```

### How to change remote url
```bash
    git remote set-url <remote_name> <remote_url>
```

### How to delete branch 
```bash
# Switch to another branch
git switch master

# Delete the branch
git branch -d branch_name

# Force Delete the branch 
git branch -D branch_name
```