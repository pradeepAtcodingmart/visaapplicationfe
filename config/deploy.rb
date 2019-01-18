# config valid for current version and patch releases of Capistrano

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure





lock "~> 3.11.0"

set :application, "visaapplicationfe"
set :repo_url, "git@github.com:pradeepAtcodingmart/visaapplicationfe.git"


set :deploy_to, '/var/www/visaapplicationfe'
set :use_sudo, true
set :scm, :git
set :keep_releases, 5
set :format, :pretty
set :log_level, :debug

append :linked_files, ".env"
append :linked_dirs, "node_modules"

set :nvm_type, :root
set :nvm_node, 'v10.15.0'
set :nvm_map_bins, %w(node npm yarn)
set :yarn_flags, %w(--production --silent --no-progress)
set :yarn_flags, '--production --silent --no-progress'    # default
set :yarn_roles, :all                                     # default
set :yarn_env_variables, {}                               # default
set :yarn_method, 'install'                               # default

namespace :deploy do

    task :yarn_deploy do
        on roles fetch(:yarn_roles) do
            within fetch(:yarn_target_path, release_path) do
                execute fetch(:yarn_bin), 'build'
            end
        end
    end
    before "symlink:release", :yarn_deploy
end

# set :ssh_options, { :forward_agent => true }
# set :npm_flags, '--silent --no-progress'

# namespace :deploy do
#     desc 'Restart application'
#     task :restart do
#       invoke 'react:build'
#     end   
# end

# after 'deploy:publishing', 'deploy:restart'