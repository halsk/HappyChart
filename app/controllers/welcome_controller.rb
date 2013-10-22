class WelcomeController < ApplicationController
  def index
  end
  def home
    @categories = Category.includes(:questions).where("form_id = 2").order(:order_num).references(:questions)
  end
end
