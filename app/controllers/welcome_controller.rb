require 'pry'
class WelcomeController < ApplicationController
  def index
  end
  def home
    @categories = Category.includes(:questions).where("form_id = 2").order(:order_num).references(:questions)
  end
  def makechart
    formid = params[:formid]
    @categories = Category.find(:all, :conditions => {:form_id => formid}, :order=>:order_num).map do |category|
      category.title
    end
  end
end
