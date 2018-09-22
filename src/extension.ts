'use strict';

import * as vscode from 'vscode';
import translate from './translation';

interface IResult {
  src: string;
  dst: string;
}

const ERROR_MESSAGE: any = {
  '52001': '请求超时，请重试',
  '52002': '系统错误，请重试',
  '52003': '未授权用户，请检查您的 appid 是否正确，或者服务是否开通',
  '54000': '必填参数为空，请检查是否少传参数',
  '54001': '签名错误，请向开发者反馈',
  '54003': '访问频率受限，请降低您的调用频率',
  '54004': '账户余额不足，请前往管理控制平台为账户充值',
  '54005': '长 query 请求频繁，请降低长 query 的发送频率，3s 后再试',
  '58000': '客户端 IP 非法，检查个人资料里填写的 IP 地址是否正确，可前往管理控制平台修改 IP 限制，IP 可留空',
  '58001': '检查译文语言是否在语言列表里'
};


export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.translate', () => {
    const outputChannel: vscode.OutputChannel = vscode.window.createOutputChannel('Translation');
    if (vscode.window.activeTextEditor) {
      const editor: vscode.TextEditor = vscode.window.activeTextEditor;
      const selection: vscode.Selection = editor.selection;
      const range: vscode.Range = new vscode.Range(selection.start, selection.end);
      const text: string = editor.document.getText(range);
      const statusBar: vscode.StatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
      statusBar.text = '$(search) Searching……';
      statusBar.show();
      translate(text)
        .then(res => {
          if (res.status === 200) {
            if (res.data.error_code) {
              vscode.window.showErrorMessage(ERROR_MESSAGE[res.data.error_code]);
            } else {
              const trans_result: Array<IResult> = res.data.trans_result;
              outputChannel.show();
              trans_result.forEach(result => {
                outputChannel.appendLine(`${result.src} => ${result.dst}`);
              });
            }
          } else {
            handleError(res.status);
          }
          statusBar.dispose();
        })
        .catch((error: Error) => {
          vscode.window.showErrorMessage(error.message);
          statusBar.dispose();
        });
    }
  });

  context.subscriptions.push(disposable);
}

function handleError(status: number): void {
  vscode.window.showErrorMessage(`发生错误：${status}`);
}

export function deactivate() {
}