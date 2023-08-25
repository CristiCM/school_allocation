Sidekiq.configure_server do |config|
    config.redis = { url: "rediss://:pf990bd13d0e1ba9c89a9d6ff469ab6db16c5604af2e638cfe8e79abd4caa0efd@ec2-52-215-126-4.eu-west-1.compute.amazonaws.com:23320", ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
  end
  
Sidekiq.configure_client do |config|
    config.redis = { url: "rediss://:pf990bd13d0e1ba9c89a9d6ff469ab6db16c5604af2e638cfe8e79abd4caa0efd@ec2-52-215-126-4.eu-west-1.compute.amazonaws.com:23320", ssl_params: { verify_mode: OpenSSL::SSL::VERIFY_NONE } }
end
  