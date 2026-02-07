const Users = () => {
  const users = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: '艺术家', status: '活跃' },
    { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: '浏览者', status: '活跃' },
    { id: 3, name: 'Charlie Day', email: 'charlie@example.com', role: '艺术家', status: '已暂停' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-display">用户管理</h1>
        <button className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          添加用户
        </button>
      </div>

      <div className="bg-card border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 text-muted-foreground">
            <tr>
              <th className="px-6 py-4 font-medium">姓名</th>
              <th className="px-6 py-4 font-medium">邮箱</th>
              <th className="px-6 py-4 font-medium">角色</th>
              <th className="px-6 py-4 font-medium">状态</th>
              <th className="px-6 py-4 font-medium">操作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded text-xs border border-blue-500/20">
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs border ${
                    user.status === '活跃' 
                      ? 'bg-green-500/20 text-green-400 border-green-500/20' 
                      : 'bg-red-500/20 text-red-400 border-red-500/20'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-sm text-primary hover:underline">编辑</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
