#include<bits/stdc++.h>
using namespace std;
typedef long long ll;

ll solve (ll N) {
    map<int,int> mp;
    for( ll i = 2; i*i <= N; ++i) {
        while( N%i == 0 ) {
            N /= i;
            mp[ i ]++;
        }
    }
    if( N != 1 ) {
        mp[N]++;
    }
    ll ans = 1;
    for( auto &i : mp ) {
        cout << i.first << ' ' << i.second << '\n';
        ans *= (i.second+1);
    }
    return ans;
    //2 * 3 * 5 * 7 * 9 * 
    //3406062811447296
    //5056252403634432
    //9216
    //18144
    //9216*18144 = 167215104
}
int main () {
    ll a; cin >> a;
    ll b; cin >> b;
    cout << solve(a) * solve(b) << '\n';
}

