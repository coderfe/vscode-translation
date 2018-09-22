import { workspace } from 'vscode';
import * as md5 from 'md5';
import axios, { AxiosInstance, AxiosPromise } from 'axios';

class Translation {
  private instance: AxiosInstance = axios.create({
    baseURL: 'https://fanyi-api.baidu.com'
  });
  private APP_ID: string | undefined;
  private SECRET_KEY: string | undefined;
  private SALT: number = Date.now();
  private FROM: string = 'zh';
  private TO: string = 'en';
  private query: string = '';

  constructor(query: string) {
    this.query = query;
    this.APP_ID = workspace.getConfiguration().get('trans.app_id');
    this.SECRET_KEY = workspace.getConfiguration().get('trans.secret_key');
  }

  private sign() {
    return md5(`${this.APP_ID}${this.query}${this.SALT}${this.SECRET_KEY}`);
  }

  /**
   * 调用通用翻译 API
   */
  public translate(): AxiosPromise {
    return this.instance.get('/api/trans/vip/translate', {
      params: {
        q: this.query,
        from: this.FROM,
        to: this.TO,
        appid: this.APP_ID,
        salt: this.SALT,
        sign: this.sign()
      }
    });
  }
}

export default (query: string) => {
  return new Translation(query).translate();
};