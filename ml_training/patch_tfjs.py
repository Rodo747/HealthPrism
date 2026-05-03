import site, os

path = [p for p in site.getsitepackages() if 'site-packages' in p][0]

for filename in ['read_weights.py', 'write_weights.py']:
    f = os.path.join(path, 'tensorflowjs', filename)
    txt = open(f).read()
    txt = txt.replace('np.object', 'object')
    txt = txt.replace('np.bool', 'bool')
    open(f, 'w').write(txt)
    print('Parcheado:', f)