# frozen_string_literal: true

Rails.application.config.middleware.use OliveBranch::Middleware,
                                        inflection: 'camel',
                                        exclude_response: lambda { |env|
                                          env['PATH_INFO'].starts_with?(
                                            '/rails/active_storage'
                                          )
                                        }

Jbuilder.key_format camelize: :lower

# removes trailing question marks from json keys
Jbuilder.key_format ->(key) { key.to_s.chomp('?') }