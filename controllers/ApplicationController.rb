class ApplicationController < Sinatra::Base

  require 'bundler'
  Bundler.require
  ActiveRecord::Base.establish_connection(
    :adapter => 'postgresql',
    :database => 'fete'
  )

  set :views, File.expand_path('../../views', __FILE__)
  set :public, File.expand_path('../../public', __FILE__)

  not_found do
    erb :not_found
  end

  get '/content' do
    erb :content
  end

  get '/login' do
    erb :login
  end

  get '/register' do
    erb :register
  end
end
