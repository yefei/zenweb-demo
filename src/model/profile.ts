import { createRepositoryQuery, model } from 'zenorm';
import { ProfileTable } from './_tables';

@model({
  pk: 'id',
  table: 'profile',
})
export default class Profile extends ProfileTable {
  static query = createRepositoryQuery<Profile, number>(Profile);
}
