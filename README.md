#generater - jdc


### 前期准备
* `yoman`相关安装：`npm install -g yo bower grunt-cli gulp`
* 运行检查命令：`yo doctor`
* 如果检查结果有问题，则根据`yo doctor`的结果，添加`yo`为全局变量。



### 安装

* 下载脚手架：`git clone git@github.com:wisteriaflash/generator-jdc.git`
* 进入脚手架文件夹，安装npm依赖：`npm install`
* 添加全局link，运行命令：`npm link`
* 创建新的项目文件夹，yoman脚手架使用：`yo jdc`



### 如何使用


1. grunt启动：`grunt`
2. 图片压缩：`grunt imagemin`—— 压缩img文件夹下的文件。
3. build发布：`grunt build`

PS：grunt linveload监听所有`scss、js、html`文件，`scss`文件会自动编译为`css`文件。



### js/css压缩block

ex - `css`：

	<!-- build:css button/base.min.css -->
	<link rel="stylesheet" href="base1.css">
	<link rel="stylesheet" href="base2.css">
	<!-- endbuild -->

* 上述代码会将`base1`,`base2`两个css文件合并、压缩为base.min.css。
* 该段代码，会自动被替换为` <link rel="stylesheet" href="base.min.css">`
* 注意：在生成css文件路径前，需要将组件名写上，例如`button/base.min.css`。


ex - `js`:

	<!-- build:js button/c.min.js -->
 	<script src="a.js"></script>
  	<script src="b.js"></script>
  	<!-- endbuild -->
  
* 上述代码会将`a.js`,`b.js`两个js文件合并、压缩为c.min.js。
* 该段代码，会自动被替换为` <script src="c.min.js"></script>`
* 注意：在生成js文件路径前，需要将组件名写上，例如`button/c.min.js`。

**注意：所有css/js文件均需要卸载block块中，否则build发布完，dist文件夹中会没有该文件。**

### 组件结构
* 新的组件，需要在`src`文件夹中新建相关组件文件夹，js/css文件均直接在组件文件夹中，不再创建`js/css`等子文件夹。
* 组件相关图片：如果图片不多，建议直接放在组件文件夹中即可。如果图片文件较多，则需要创建`img`子文件夹。
* **组件的文件结构，参见`popup`- 弹层组件。**



### 其他

* bower：使用`bower`，来管理js框架等资源文件的版本等，依赖文件见配置文件`bower.json`，安装的资源文件安装见`bower_components`。
* npm镜像：建议使用cnpm镜像，以保证npm安装顺畅，设置方法如下：
  * `npm config set registry https://registry.cnpmjs.org`
  * `npm get registry`
 
* win下推荐使用命令行工具：[cmder](http://bliker.github.io/cmder/)