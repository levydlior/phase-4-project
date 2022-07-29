class TileSerializer < ActiveModel::Serializer
  attributes :id
  has_one :user
  has_one :city
end
