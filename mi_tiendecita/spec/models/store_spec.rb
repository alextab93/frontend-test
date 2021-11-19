# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Store, type: :model do
  describe 'Associations' do
    it { should have_many(:users) }
    it { should have_many(:products)}
  end
end
