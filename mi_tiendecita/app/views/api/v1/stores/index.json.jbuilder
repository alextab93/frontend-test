# frozen_string_literal: true

json.array! @stores do |store|
  json.partial! 'store', store: store
end
