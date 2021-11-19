# This file is copied to spec/ when you run 'rails generate rspec:install'
require 'spec_helper'
require 'support/factory_bot'
require 'support/authentication'
ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../config/environment', __dir__)
# Prevent database truncation if the environment is production
abort('The Rails environment is running in production mode!') if Rails.env.production?
require 'rspec/rails'

# The following line is provided for convenience purposes. It has the downside
# of increasing the boot-up time by auto-requiring all files in the support
# directory. Alternatively, in the individual `*_spec.rb` files, manually
# require only the support files necessary.
#
Dir[Rails.root.join('spec', 'support', '**', '*.rb')].sort.each { |f| require f }

# Checks for pending migrations and applies them before tests are run.
# If you are not using ActiveRecord, you can remove these lines.
begin
  ActiveRecord::Migration.maintain_test_schema!
rescue ActiveRecord::PendingMigrationError => e
  puts e.to_s.strip
  exit 1
end

FactoryBot::SyntaxRunner.class_eval do
  include ActionDispatch::TestProcess
end

RSpec.configure do |config|

  config.use_transactional_fixtures = true

  config.infer_spec_type_from_file_location!

  config.filter_rails_from_backtrace!

  config.fixture_path = "#{::Rails.root}/spec/fixtures"

  config.include Authentication, type: :request

  # You can uncomment this line to turn off ActiveRecord support entirely.
  # config.use_active_record = false
  Shoulda::Matchers.configure do |conf|
    conf.integrate do |with|
      with.test_framework :rspec
      with.library :rails
    end
  end
end
