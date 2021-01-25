import { AppInjector } from "./app-injector.service";
import { tap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BehaviorSubject, ReplaySubject } from "rxjs";
import { Factory } from "./factory";
import { Helper } from "./helper";

@Injectable({
  providedIn: "root",
})
export abstract class BaseService {
  protected _data: any[] = [];
  protected _singleData: any;
  protected _schema: string[];

  protected factory: Factory;
  protected helper: Helper;

  public singleData$ = new ReplaySubject<any>(1);
  public data$ = new ReplaySubject<any[]>(1);
  public loading$ = new BehaviorSubject(false);
  public schema$ = new ReplaySubject<string[]>(1);
  public lastItemcreated$ = new ReplaySubject<any>(1);
  public lastItemDeleted$ = new ReplaySubject<any>(1);

  set data(data: any[]) {
    this._data = data;
    this.data$.next(this._data);
  }

  set singleData(singleData: any) {
    // if (singleData) {
    this._singleData = singleData;
    this.singleData$.next(this._singleData);
    // }
  }

  set lastItemCreated(item: any) {
    this.lastItemcreated$.next(item);
  }

  set loading(loading: boolean) {
    this.loading$.next(loading);
  }

  set schema(schema: any) {
    this._schema = schema;
    this.schema$.next(this._schema);
  }

  get schema() {
    return this._schema;
  }

  get data() {
    return this._data;
  }

  get singleData() {
    return this._singleData;
  }

  constructor(protected endPoint: string) {
    this.factory = AppInjector.injector.get(Factory);
    this.helper = AppInjector.injector.get(Helper);
  }

  initialise(emitData: boolean = true) {
    return this.factory.get(`${this.endPoint}/initialise`).pipe(
      tap(emitData ? this.listResponseHandler() : this.onlyErrorResponseHandler())
    );
  }

  

  search(word: string, fields: string[]) {
    return this.factory
      .post(`${this.endPoint}/search`, { word, fields })
      .pipe(tap(this.listResponseHandler()));
  }

  get(params?: any) {
    return this.factory.get(`${this.endPoint}`).pipe(
      tap({
        next: (data) => (this.data = data),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  latest() {
    return this.factory.get(`${this.endPoint}/latest`);
  }

  download(fileID: number) {
    return this.factory.get(`file/${fileID}/download`);
  }

  add(elements: object) {
    return this.factory.post(this.endPoint, elements).pipe(
      tap({
        next: (response) => {
          this.lastItemCreated = response;
          this.unshiftItemInData(response);
        },
        error: (error) => {
          this.errorResponseHandler(error);
        },
      })
    );
  }

  describe() {
    return this.factory.get(`${this.endPoint}/describe`).pipe(
      tap({
        next: (schema) => (this.schema = schema),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  getSingle(id: number) {
    return this.factory.get(`${this.endPoint}/${id}`).pipe(
      tap({
        next: (single) => (this.singleData = single),
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  update(id: number, data: {}) {
    return this.factory.put(`${this.endPoint}/${id}`, data).pipe(
      tap({
        next: (response) => {
          this.updateItemInData(id, response);

          if (this._singleData) {
            this.singleData = response;
          }
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  delete(id: number) {
    return this.factory.delete(`${this.endPoint}/${id}`).pipe(
      tap({
        next: () => {
          this.deleteItemInData(id);
        },
        error: (error) => this.errorResponseHandler(error),
      })
    );
  }

  pushItemInData(item: any) {
    this._data.push(item);
    this.data$.next(this._data);
  }

  unshiftItemInData(item: any) {
    this._data.unshift(item);
    this.data$.next(this._data);
  }

  deleteItemInData(id: number, libelleID: string = "id") {
    this._data = this._data.filter((item) => {
      return item[libelleID] != id;
    });

    this.data$.next(this._data);
  }

  findItemInDataByID(id: any, libelleID: string = "id") {
    return this._data.find((item) => item[libelleID] == id);
  }

  findIndexItemInDataByID(id: number, libelleID: string = "id") {
    return this._data.findIndex((element) => {
      return element[libelleID] == id;
    });
  }

  updateItemInData(id: number, data: any) {
    if (this._data.length) {
      const index = this.findIndexItemInDataByID(id);
      this._data[index] = data;
      this.data$.next(this._data);
    }
  }

  errorResponseHandler(error: any) {
    this.helper.alertDanger(error);
  }

  listResponseHandler = () => {
    return {
      next: (data) => (this.data = data),
      error: (error) => this.errorResponseHandler(error),
    };
  };

  onlyErrorResponseHandler = () => {
    return {
      error: (error) => this.errorResponseHandler(error),
    };
  };
}
