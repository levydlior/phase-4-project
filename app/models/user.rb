class User < ApplicationRecord
    has_secure_password

    has_many :tiles, dependent: :destroy
    has_many :cities, through: :tiles

    validates :username, uniqueness: true

end
