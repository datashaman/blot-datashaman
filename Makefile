deploy:
	cd src && rsync -av --delete --delete-excluded ./ $(HOME)/Dropbox/Apps/Blot/Templates/copy-of-default/
