echo "Generating module"
nest g module modules/$1 --no-spec
echo "Generating controller"
nest g controller modules/$1 --no-spec
echo "Generating service"
nest g service modules/$1 --no-spec
