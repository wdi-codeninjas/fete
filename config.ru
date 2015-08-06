require 'sinatra/base'
# require 'madrill'

# controllers
require './controllers/ApplicationController'
require './controllers/HomeController'
require './controllers/UsersController'
require './controllers/ConcertsController'


#models
require './models/UsersModel'
require './models/ConcertsModel'

map('/') { run HomeController }
map('/users') { run UsersController }
map('/concerts') { run ConcertsController }
