const projectToken = 'xxx'
const repo = "git@git.dev.sh.ctripcorp.com:train-pal/MainProject.git"
let  url = repo.replace(':', '/').replace('git@', `http://read_repository:${projectToken}@`)
;
console.log('url: ', url);