require 'pry'
class WelcomeController < ApplicationController
  def index
  end
  def home
    formid = Form.first
    @categories = Category.includes(:questions).where("form_id = " + formid.id.to_s).order(:order_num).references(:questions)
    @job_types = JobType.find(:all, :order=>:order_num)
    @count = Answer.count
  end
  def makechart
    # get formid
    formid = params[:formid]
    # get answer object if exists
    @answer = nil;
    if !params[:fbid].nil? && !params[:fbid].blank?
      @answer = Answer.find(:first, :conditions => {:facebook_id => params[:fbid], :form_id => formid})
    elsif !params[:hashid].nil? && !params[:hashid].blank?
      @answer = Answer.find(:first, :conditions => {:hashid => params[:hashid]})
    end
    zipcode = params[:zipcode]
    zipcode.delete!("-") if (zipcode)
    if @answer
      @answer.zipcode = zipcode
      @answer.living_place = params[:location]
      @answer.sex = params[:sex]
      @answer.family_type = params[:fam_choice]
      @answer.birth_year = params[:birthyear]
      @answer.job_type_id = params[:job_choice]
      @answer.save
    else
      # create new
      @answer = Answer.create(
        :zipcode => zipcode,
        :form_id => params[:formid],
        :living_place => params[:location],
        :family_type => params[:fam_choice],
        :sex => params[:sex],
        :birth_year => params[:birthyear],
        :job_type_id => params[:job_choice],
        :facebook_id => params[:fbid],
        :facebook_name => params[:fbname]
      )
    end
    # add answer details
    @answer.answer_details.delete_all
    params.each do |key,value|
      if (key[0,2] == "q-")
        qid = key.split('-')[2]
        @answer.answer_details.build(:question_id => qid, :answer_rate => value.to_i).save
      end
    end
  end
  def japan
    @regions = Answer.group('pref_id').count.to_json
  end
  def diff
    @myanswer = Answer.find(:first, :conditions => {:hashid => params[:hashid]}).titleandvalue
    formid = Form.first.id
    other_answers = Answer.connection.select_all(sprintf("SELECT detail.question_id,avg(detail.answer_rate) as avg from answers as a left join answer_details as detail on a.id = detail.answer_id group by a.form_id, a.pref_id, detail.question_id having pref_id= %d and form_id = %d;", params[:pref], formid))
    categories = Category.find(:all, :conditions => {:form_id => formid}, :order=>:order_num)
    @panswer = categories.map do |category|
      value = category.questions.inject(0){|sum, q|
        tgt = other_answers.select{|item| item["question_id"] == q.id}
        sum += tgt.inject(0.0){|s, a|
          s += a["avg"]
        } / tgt.size
      } / category.questions.size
      {
        :id => category.id,
        :title => category.title,
        :value => value
      }
   end

  end
end
