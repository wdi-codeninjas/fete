class UsersController < ApplicationController

  enable :sessions

  get '/login' do
    erb :login
  end

  post '/login' do

    puts '---------'
    puts params
    puts '---------'


    @username = params[:username]

    @message = ''
    if does_user_exist?(params[:username]) == false
      @message = 'Sorry... but that username does not exist'
      session[:current_user] = user
      return erb :login_notice
    end

    #Find and get user
    user = UsersModel.where(:username => params[:username]).first!

    #Does password match?
    pwd = params[:password]
    if user.password_hash == BCrypt::Engine.hash_secret(pwd, user.password_salt)
      @message = 'You have been logged in succesfully'
      session[:user] = user
      return erb :index

    else
      @message = 'Your password does not match'
      return erb :index
    end


  end

  def is_not_authenticated?
    #if yes, it is not nil, else false
    session[:username].nil?
  end

  get '/logout' do
    session[:current_user] = nil
    redirect '/'
  end

  get '/resource' do
    puts is_not_authenticated?
    puts session[:username]
  end


  get '/register' do
    erb :register
  end

  post '/register' do
    puts '________'
    puts params
    puts '________'
    @message = ''

    if does_user_exist?(params[:username]) == true
      @message = 'Username already exists'
      return erb :register_notice
    end

    password_salt = BCrypt::Engine.generate_salt
    password_hash = BCrypt::Engine.hash_secret(params[:password], password_salt)

    newbie = UsersModel.new
    newbie.username = params[:username]
    newbie.password_hash = password_hash
    newbie.password_salt = password_salt
    newbie.save

    session[:current_user] = newbie
    session[:user] = newbie

    @message = 'You have succesfully registered!'

    erb :index

  end

  def does_user_exist? (username)
    user = UsersModel.find_by(:username => username.to_s)
    if user
      return true
    else
      return false
    end
  end

end
