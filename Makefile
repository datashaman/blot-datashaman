deploy:
	cd src && rsync -av --exclude-from .deployignore --delete --delete-excluded ./ $(HOME)/Dropbox/Apps/Blot/Templates/copy-of-default/
