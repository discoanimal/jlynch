class PagesController < ApplicationController
  skip_authorization_check
  skip_before_action :authenticate_user!

  def privacy
    user_agent = UserAgent.parse(request.user_agent)
    @browser = user_agent.browser
    @version = user_agent.version
    @platform = user_agent.platform
    @uas = user_agent
    @os = user_agent.os
    @mobile = user_agent.mobile?
    @bot = user_agent.bot?
    @hash = user_agent.to_h
    @dup = user_agent.dup
    @truth = user_agent.eql?(@dup)
    @ip = request.remote_ip
    @realip = request.params
  end

  # Preview html email template
  def email
    tpl = (params[:layout] || 'hero').to_sym
    tpl = :hero unless [:email, :hero, :simple].include? tpl
    file = 'user_mailer/welcome_email'
    @user = (defined?(FactoryGirl) \
      ? User.new( FactoryGirl.attributes_for :user )
      : User.new( email: 'test@example.com', first_name: 'John', last_name: 'Smith' ))
    render file, layout: "emails/#{tpl}"
    if params[:premail] == 'true'
      puts "\n!!! USING PREMAILER !!!\n\n"
      pre = Premailer.new(response_body[0],  warn_level: Premailer::Warnings::SAFE, with_html_string: true)
      reset_response
      # pre.warnings
      render text: pre.to_inline_css, layout: false
    end
  end

  def error
    redirect_to root_path if flash.empty?
  end
end
