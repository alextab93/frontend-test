# frozen_string_literal: true

unless Rails.env.test?
  Rack::MiniProfiler.config.position = 'bottom-right'
  Rack::MiniProfiler.config.start_hidden = true
end
