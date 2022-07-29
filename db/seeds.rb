City.destroy_all
User.destroy_all
Tile.destroy_all

puts "seeding"

City.create!(name: 'San Francisco')
City.create!(name: 'Seattle')
City.create!(name: 'Austin')
City.create!(name: 'Toronto')
City.create!(name: 'New York')
City.create!(name: 'Las Vegas')
City.create!(name: 'Boston')

User.create(username: "mark", password: "mark")
User.create(username: "lior", password: "lior")
User.create(username: "shane", password: "shane")



Tile.create!(user_id: 1, city_id: 1)
Tile.create!(user_id: 1, city_id: 2)
Tile.create!(user_id: 1, city_id: 3)
Tile.create!(user_id: 1, city_id: 4)

Tile.create!(user_id: 2, city_id: 1)
Tile.create!(user_id: 2, city_id: 2)
Tile.create!(user_id: 2, city_id: 3)
Tile.create!(user_id: 2, city_id: 4)


Tile.create!(user_id: 3, city_id: 1)
Tile.create!(user_id: 3, city_id: 2)
Tile.create!(user_id: 3, city_id: 3)
Tile.create!(user_id: 3, city_id: 4)

puts "Done seeding"

