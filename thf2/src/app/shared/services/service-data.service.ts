import { Injectable } from '@angular/core';
import { IReceivingFamily } from '../model/receiving-family.model';
import { PoBreadcrumb } from '@po-ui/ng-components';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  private nameKey: string;
  private valueKey: string;
  private fieldSearchProduct: string;
  private route: string;
  private routeParent: string;
  private apiUrl: string; // enviar o endPoint
  private breadCrumb: PoBreadcrumb;
  private data: any;
  private oldData: any;
  private origin: string;
  private disabledField: string;

  constructor() { }


  setNameKey(nameKey: string) {
    this.nameKey = nameKey;
  }

  getNameKey() {
    return this.nameKey;
  }

  setValueKey(valueKey: string) {
    this.valueKey = valueKey;
  }

  getValueKey() {
    return this.valueKey;
  }
  setFieldSearchProduct(fieldSearchProduct: string) {
    this.fieldSearchProduct = fieldSearchProduct;
  }

  getFieldSearchProduct() {
    return this.fieldSearchProduct;
  }

  setRoute(route: string) {
    this.route = route;
  }
  getRoute() {
    return this.route;
  }

  setRouteParent(routeParent: string) {
    this.routeParent = routeParent;
  }
  getRouteParent() {
    return this.routeParent;
  }

  setApiUrl(apiUrl: string) {
    this.apiUrl = apiUrl;

  }
  geApitUrl() {
    return this.apiUrl;
  }
  setBreadCrumb(breadCrumb: PoBreadcrumb) {
    this.breadCrumb = breadCrumb;
  }
  getBreadCrumb() {
    return this.breadCrumb;
  }
  setOrigin(origin: string) {
    this.origin = origin;

  }
  getOrigin() {
    return this.origin;
  }
  setDisabledField(disabledField: string) {
    this.disabledField = disabledField;
  }
  getDisabledField() {
    return this.disabledField;
  }
  setUpdateRecord(data: any) {
    this.data = data;
  }

  getUpdateRecord() {
    return this.data;
  }
  setOldRecord(oldData: any) {
    this.oldData = oldData;
  }

  getOldRecord() {
    return this.oldData;
  }
}
