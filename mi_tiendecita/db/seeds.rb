store = Store.create!(name: 'La tiendita de Don Pepe', address: 'Calle 4, Lima')

User.create!(email: 'user@test.com', password: 'pass123', first_name: 'User', last_name: 'Test', store: store)

def seed_product(name, code, price, description, store)
  Product.create!(name: name,
                  code: code,
                  price: price,
                  description: description,
                  store: store,
                  image_url: "https://robohash.org/#{(name + code).hash}.png?size=150x150&set=set5")
end

seed_product('Inka Kola', 'ik01', 3_00, 'La gaseosa del Peru', store)
seed_product('Ajinomen', 'aj22', 1_50, 'La mejor sopa instantanea', store)
