require 'sinatra/base'
# require 'madrill'

# controllers
require './controllers/ApplicationController'
require './controllers/HomeController'
require './controllers/UsersController'



#models
require './models/UsersModel'
require './models/ConcertsModel'

map('/') { run HomeController }
map('/users') { run UsersController }
