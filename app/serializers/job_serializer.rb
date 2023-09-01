class JobSerializer
    include FastJsonapi::ObjectSerializer
    attributes :first_notification_time, :second_notification_time, :allocation_time, :allocation_done
end

#   We can access serializer data for single record by,
#   UserSerializer.new(resource).serializable_hash[:data][:attributes]
#   And multiple records by,
#   UserSerializer.new(resource).serializable_hash[:data].map{|data| data[:attributes]}