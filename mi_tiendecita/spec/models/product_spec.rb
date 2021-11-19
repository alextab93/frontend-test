# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Product, type: :model do
  describe 'Associations' do
    it { should belong_to(:store) }
  end
end
