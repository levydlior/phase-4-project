# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#

puts "seeding.."

User.create(username: "mark", password: "mark")
User.create(username: "lior", password: "lior")
User.create(username: "shane", password: "shane")


puts "Done seeding"