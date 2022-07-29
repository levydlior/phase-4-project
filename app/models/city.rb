class City < ApplicationRecord
    has_many :tiles, dependent: :destroy
    has_many :users, through: :tiles

    validates :name, presence: true
end
