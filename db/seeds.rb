# coding: utf-8
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#
JobType.create([
{ :title => "会社員", :order_num => 1},
{ :title => "会社役員", :order_num =>2 },
{ :title => "公務員・団体等職員", :order_num =>3 },
{ :title => "自営業", :order_num => 4 },
{ :title => "専門職（弁護士、医師、会計士等）", :order_num => 5},
{ :title => "パート・アルバイト", :order_num =>6 },
{ :title => "専業主婦・主夫", :order_num =>7 },
{ :title => "無職", :order_num =>9},
{ :title => "学生", :order_num =>8},
{ :title => "その他", :order_num =>10 }])
