export enum ApplicationSsnType {
  New = 1, Change = 2, Replace = 3, Other = 1000
}

export class ApplicationSsnTypeOptions {
  New = ApplicationSsnType.New;
  Change = ApplicationSsnType.Change;
  Replace = ApplicationSsnType.Replace;
  Other = ApplicationSsnType.Other;
}
export enum SsnPackageType {
  InPerson = 1, Electronic = 2, Complete = 3
}
