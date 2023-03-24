import { model } from 'zenorm';
import { UploadTable } from './_tables';

@model({
  pk: 'id',
  table: 'upload',
})
export default class Upload extends UploadTable {
}
