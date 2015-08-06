class ConcertsController < ApplicationController

  post '/save_event' do

    puts '-----yolo-------'
    puts params
    puts '-----yolo-------'

    @current_user = session[:user]
    @current_user_id = @current_user.id

    @event = ConcertsModel.new
    @event.artist = params[:title]
    @event.userid = @current_user_id.to_i
    @event.venue = params[:name]
    @event.datetime = params[:date]
    puts @event
    @event.save
    # create model crud to add event



    # create a success erb; render it
    return erb :save_event


  end

  get '/user_concerts' do

    @current_user = session[:user]

    @concerts = ConcertsModel.all

    @my_events = Array.new

    @concerts.each do |event|

        if event.userid == @current_user.id

          @my_events.push(event)

        end

    end

    return erb :my_events

  end


end
