# VSCode 翻译插件

一个简单的 Visual Studio Code 翻译插件。

目前支持中文翻译为英文。

## 使用

![usage](https://raw.githubusercontent.com/coderfe/vscode-translation/master/images/vscode-translation.gif)

插件使用了[百度翻译平台的 API][1]，因此需要[申请][2]翻译 API 服务。

申请之后，在 VSCode 设置中配置 APP ID 和 私钥。

```json
{
  //...
  "trans.app_id": "xxxxxxxxxxxxxxxx",
  "trans.secret_key": "xxxxxxxxxxxxxxxx"
  //...
}
```

[1]: http://api.fanyi.baidu.com/api/trans/product/index
[2]: http://api.fanyi.baidu.com/api/trans/product/apichoose
