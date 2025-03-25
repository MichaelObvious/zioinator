verbi = []
# with open('coniugazione_verbi.txt') as f:
#     verbi = set(f.readlines())

# print(len(verbi))

parole = []
with open('parole.txt') as f:
    parole = map(lambda x: x.strip(), filter(lambda x: x not in verbi, f.readlines()))

parole = filter(lambda x: len(x) > 1, parole)
# parole = filter(lambda x: x.startswith('p') or x.startswith('c'), parole)
parole = filter(lambda x: not (x.endswith('i')), parole)
# parole = filter(lambda x: not (x.endswith('iamo')), parole)
# parole = filter(lambda x: not (x.endswith('iate')), parole)
# parole = filter(lambda x: not (x.endswith('avo') ), parole)
# parole = filter(lambda x: not (x.endswith('eva') ), parole)
# parole = filter(lambda x: not (x.endswith('ono') ), parole)
parole = filter(lambda x: not (x[-1] in 'bcdfghjklmnpqrstvwxyz'), parole)
parole = filter(lambda x: x.islower(), parole)
parole = filter(lambda x: all(map(lambda c: not c.isdigit() and (c.isalpha() or c in '\'-'), x)), parole)

with open('parole.js', 'w') as f:
    f.write('let parole = [')
    f.write(','.join(map(lambda x: f'"{x}"', parole)))
    f.write(']')