## 安装cabin-cli
$ npm install -g cabin-cli


# 测试安装成功,新开一个命令行输入
cabin-init 
# 如有操作提示则安装成功
PS：如果报错node/r   则cli版本问题，请安装
npm install -g cabin-cli@1.2.14


#输入
 cabin-init

 # 使用方式 cabin-init 命令  项目名
  Usage: cabin-init [opiton] <project-name>

 # 命令
  Options:
    --path     edit servers path
    -h, --help  output usage information
 #例如   
 Examples:

          # create a new Cabin project with official template
          $ cabin-init <project-name>

          #to change servers folder,Examples: windows => E:/work  mac => /Users/work
          $ cabin-init --path E:/work

          #to start a dev servers
          $ cabin-dev-server



cabin地址（内网）
    http://static.dmall.com/kayak-project/cabinpro/html/index.html#index/cabincenter/getstart




本地访问地址：
http://testlocal.dmall.com:3000/kayak-project/testa/html/index.html?debug-testa=http://local.dmall.com:3000/kayak-project#index/testa/test