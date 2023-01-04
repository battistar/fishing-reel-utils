export enum ResultType {
  Length,
  Size,
}

interface ResultData {
  type: ResultType;
  lineLingth: number;
  lineSize: number;
}

export default ResultData;
