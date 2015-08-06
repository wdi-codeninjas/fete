class ApplicationController < Sinatra::Base

  require 'bundler'
  Bundler.require

  ActiveRecord::Base.establish_connection(
    :adapter => 'postgresql',
    :database => 'fete'
  )

  enable :sessions

  set :views, File.expand_path('../../views', __FILE__)
  set :public, File.expand_path('../../public', __FILE__)


def is_authenticated?
  if session[:current_user].nil? == true
    puts 'not authenticated'
    return false
  else
    puts 'authenticated'
    return true
  end
end

def current_user
  return session[:current_user]
end

def authorization_check
  if is_authenticated? == false
    redirect '/not_authenticated'
  end
end

  not_found do
    erb :not_found
  end



  get '/about' do
    erb :about
  end

end
