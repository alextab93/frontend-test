def seed_product(store)
  Product.create!(name: Faker::Commerce.product_name,
                  code: Faker::Code.npi,
                  price: rand(300..15_000),
                  description: Faker::Lorem.sentence,
                  store: store,
                  image_url: Faker::LoremPixel.image(size: '150x150', is_gray: false, category: 'food'))
end

3.times do |t|
  u = User.create!(email: "user_#{t + 1}@test.com",
    password: 'pass123',
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    avatar_url: Faker::Avatar.image)
end

user_n = 1
6.times do |t|
  store = Store.create!(name: Faker::Company.name, address: Faker::Address.street_address)
  user = User.find_by(email: "user_#{user_n}@test.com")
  user.store_users.create!(user: user, store: store)
  user_n += 1 unless t % 2 == 0
  rand(3..10).times do
    seed_product(store)
  end
end

