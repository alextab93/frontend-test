def seed_product(store)
  Product.create!(name: Faker::Commerce.product_name,
                  code: Faker::Code.npi,
                  price: rand(300..15_000),
                  description: Faker::Lorem.sentence,
                  store: store,
                  image_url: Faker::LoremPixel.image(size: '150x150', is_gray: false, category: 'food'))
end

4.times do |t|
  store = Store.create!(name: Faker::Company.name, address: Faker::Address)
  User.create(email: "store_#{t + 1}@test.com",
              password: 'pass123',
              first_name: Faker::Name.first_name,
              last_name: Faker::Name.last_name,
              store: store)
  rand(3..10).times do
    seed_product(store)
  end
end
