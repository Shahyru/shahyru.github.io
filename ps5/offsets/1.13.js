const OFFSET_wk_vtable_first_element     = 0x00135C30;
const OFFSET_wk_memset_import            = 0x02523848;
const OFFSET_wk___stack_chk_guard_import = 0x02523790;

const OFFSET_lk___stack_chk_guard        = 0x00065190;
const OFFSET_lk_pthread_create_name_np   = 0x00001AB0;
const OFFSET_lk_pthread_join             = 0x0002D060;
const OFFSET_lk_pthread_exit             = 0x0001EAD0;
const OFFSET_lk__thread_list             = 0x0005C1A0;
const OFFSET_lk_sleep                    = 0x00021450;
const OFFSET_lk_sceKernelGetCurrentCpu   = 0x00002C10;

const OFFSET_lc_memset                   = 0x00012F80;
const OFFSET_lc_setjmp                   = 0x0005BE90;
const OFFSET_lc_longjmp                  = 0x0005BEE0;

const OFFSET_WORKER_STACK_OFFSET         = 0x007FB88;

let wk_gadgetmap = {
    "ret":              0x00000042,
    "pop rdi":          0x000F2E5D,
    "pop rsi":          0x000429F4,
    "pop rdx":          0x001788C2,
    "pop rcx":          0x0009B9B9,
    "pop r8":           0x000792C1,
    "pop r9":           0x000C1621,
    "pop rax":          0x0001B122,
    "pop rsp":          0x00061424,

    "mov [rdi], rsi":   0x00EFFCC8,
    "mov [rdi], rax":   0x001109F3,
    "mov [rdi], eax":   0x00017BDE,

    "infloop":          0x000134B8,

    "shl rax, 4":       0x00C5D408,

    //branching specific gadgets
    "cmp [rcx], eax":   0x009E8D22,
    "sete al":          0x000184FA,
    "seta al":          0x000865ED,
    "setb al":          0x00050F27,
    "setg al":          0x0002D97C,
    "setl al":          0x0049F4CC,
    "shl rax, 3":       0x0173A063,
    "add rax, rcx":     0x0019D796,
    "mov rax, [rax]":   0x000F082C,
    "inc dword [rax]":  0x004C7FBA,
};

let syscall_map = {
	0x001: 0x0002FEFA, // sys_exit
	0x002: 0x00031D50, // sys_fork
	0x003: 0x00032530, // sys_read
	0x004: 0x00030FD0, // sys_write
	0x005: 0x00030490, // sys_open
	0x006: 0x000302B0, // sys_close
	0x007: 0x0002FEB0, // sys_wait4
	0x00A: 0x000300E0, // sys_unlink
	0x00C: 0x00030630, // sys_chdir
	0x00F: 0x00030130, // sys_chmod
	0x014: 0x00031EF0, // sys_getpid
	0x017: 0x00030170, // sys_setuid
	0x018: 0x000313D0, // sys_getuid
	0x019: 0x0002FF80, // sys_geteuid
	0x01B: 0x00030570, // sys_recvmsg
	0x01C: 0x00031030, // sys_sendmsg
	0x01D: 0x00031370, // sys_recvfrom
	0x01E: 0x00030040, // sys_accept
	0x01F: 0x0002FDF0, // sys_getpeername
	0x020: 0x00030FF0, // sys_getsockname
	0x021: 0x00030210, // sys_access
	0x022: 0x000307B0, // sys_chflags
	0x023: 0x00032260, // sys_fchflags
	0x024: 0x000302F0, // sys_sync
	0x025: 0x000320C0, // sys_kill
	0x027: 0x00030EF0, // sys_getppid
	0x029: 0x000323E0, // sys_dup
	0x02A: 0x00031A60, // sys_compat10.pipe
	0x02B: 0x00030F90, // sys_getegid
	0x02C: 0x000321E0, // sys_profil
	0x02F: 0x00031C50, // sys_getgid
	0x031: 0x000318E0, // sys_getlogin
	0x032: 0x00030100, // sys_setlogin
	0x035: 0x00031D90, // sys_sigaltstack
	0x036: 0x000304D0, // sys_ioctl
	0x037: 0x0002FFE0, // sys_reboot
	0x038: 0x00031F90, // sys_revoke
	0x03B: 0x0003175D, // sys_execve
	0x041: 0x00032030, // sys_msync
	0x049: 0x00031EB0, // sys_munmap
	0x04A: 0x00030A00, // sys_mprotect
	0x04B: 0x0002FD90, // sys_madvise
	0x04E: 0x00031250, // sys_mincore
	0x04F: 0x00032440, // sys_getgroups
	0x050: 0x00030E90, // sys_setgroups
	0x053: 0x000306F0, // sys_setitimer
	0x056: 0x00030C00, // sys_getitimer
	0x059: 0x00031B30, // sys_getdtablesize
	0x05A: 0x00030980, // sys_dup2
	0x05C: 0x00031980, // sys_fcntl
	0x05D: 0x00032510, // sys_select
	0x05F: 0x00030CE0, // sys_fsync
	0x060: 0x00030B80, // sys_setpriority
	0x061: 0x00032380, // sys_socket
	0x062: 0x00030750, // sys_connect
	0x063: 0x000321C0, // sys_netcontrol
	0x064: 0x000318A0, // sys_getpriority
	0x065: 0x000310A0, // sys_netabort
	0x066: 0x00031110, // sys_netgetsockinfo
	0x068: 0x00030CC0, // sys_bind
	0x069: 0x000303B0, // sys_setsockopt
	0x06A: 0x00030BA0, // sys_listen
	0x071: 0x000312F0, // sys_socketex
	0x072: 0x00032080, // sys_socketclose
	0x074: 0x00031F10, // sys_gettimeofday
	0x075: 0x00031B10, // sys_getrusage
	0x076: 0x00030610, // sys_getsockopt
	0x078: 0x00030C40, // sys_readv
	0x079: 0x00030AE0, // sys_writev
	0x07A: 0x00031270, // sys_settimeofday
	0x07C: 0x00031F50, // sys_fchmod
	0x07D: 0x00031DB0, // sys_netgetiflist
	0x07E: 0x00031290, // sys_setreuid
	0x07F: 0x00031390, // sys_setregid
	0x080: 0x00030E30, // sys_rename
	0x083: 0x00030E10, // sys_flock
	0x085: 0x00031DD0, // sys_sendto
	0x086: 0x00030A60, // sys_shutdown
	0x087: 0x00032710, // sys_socketpair
	0x088: 0x00031650, // sys_mkdir
	0x089: 0x00032140, // sys_rmdir
	0x08A: 0x000315F0, // sys_utimes
	0x08C: 0x00031330, // sys_adjtime
	0x08D: 0x00030870, // sys_kqueueex
	0x093: 0x000300C0, // sys_setsid
	0x0A5: 0x00031E70, // sys_sysarch
	0x0B6: 0x00031170, // sys_setegid
	0x0B7: 0x000312B0, // sys_seteuid
	0x0BC: 0x00031BF0, // sys_stat
	0x0BD: 0x00031A90, // sys_fstat
	0x0BE: 0x00032180, // sys_lstat
	0x0BF: 0x00032100, // sys_pathconf
	0x0C0: 0x00032480, // sys_fpathconf
	0x0C2: 0x00031E30, // sys_getrlimit
	0x0C3: 0x00031D10, // sys_setrlimit
	0x0C4: 0x00030470, // sys_getdirentries
	0x0CA: 0x00031860, // sys___sysctl
	0x0CB: 0x000324A0, // sys_mlock
	0x0CC: 0x00032610, // sys_munlock
	0x0CE: 0x0002FE30, // sys_futimes
	0x0D1: 0x00031510, // sys_poll
	0x0E8: 0x00032650, // sys_clock_gettime
	0x0E9: 0x000326F0, // sys_clock_settime
	0x0EA: 0x000316B0, // sys_clock_getres
	0x0EB: 0x000322A0, // sys_ktimer_create
	0x0EC: 0x00031FB0, // sys_ktimer_delete
	0x0ED: 0x000301B0, // sys_ktimer_settime
	0x0EE: 0x0002FE10, // sys_ktimer_gettime
	0x0EF: 0x00030370, // sys_ktimer_getoverrun
	0x0F0: 0x000311D0, // sys_nanosleep
	0x0F1: 0x0002FF60, // sys_number241
	0x0F2: 0x000305B0, // sys_number242
	0x0F3: 0x00030020, // sys_number243
	0x0F7: 0x00031F30, // sys_number247
	0x0FB: 0x0002FED9, // sys_rfork
	0x0FD: 0x00030F70, // sys_issetugid
	0x110: 0x000315D0, // sys_getdents
	0x121: 0x00030AC0, // sys_preadv
	0x122: 0x00030B60, // sys_pwritev
	0x136: 0x00030350, // sys_getsid
	0x13B: 0x00031050, // sys_aio_suspend
	0x144: 0x000325B0, // sys_mlockall
	0x145: 0x00030510, // sys_munlockall
	0x147: 0x00031350, // sys_sched_setparam
	0x148: 0x000318C0, // sys_sched_getparam
	0x149: 0x00030650, // sys_sched_setscheduler
	0x14A: 0x00031820, // sys_sched_getscheduler
	0x14B: 0x00031490, // sys_sched_yield
	0x14C: 0x00031880, // sys_sched_get_priority_max
	0x14D: 0x00032590, // sys_sched_get_priority_min
	0x14E: 0x00031150, // sys_sched_rr_get_interval
	0x154: 0x00030D63, // sys_sigprocmask
	0x155: 0x00031CB0, // sys_sigsuspend
	0x157: 0x00031C70, // sys_sigpending
	0x159: 0x000309C0, // sys_sigtimedwait
	0x15A: 0x00031A20, // sys_sigwaitinfo
	0x16A: 0x000306B0, // sys_kqueue
	0x16B: 0x000306D0, // sys_kevent
	0x17B: 0x00030690, // sys_mtypeprotect
	0x188: 0x0002FF40, // sys_uuidgen
	0x189: 0x000321A0, // sys_sendfile
	0x18D: 0x000305F0, // sys_fstatfs
	0x190: 0x00032750, // sys_ksem_close
	0x191: 0x00031430, // sys_ksem_post
	0x192: 0x00031730, // sys_ksem_wait
	0x193: 0x00031470, // sys_ksem_trywait
	0x194: 0x00030850, // sys_ksem_init
	0x195: 0x00030290, // sys_ksem_open
	0x196: 0x00031AD0, // sys_ksem_unlink
	0x197: 0x000309E0, // sys_ksem_getvalue
	0x198: 0x000319A0, // sys_ksem_destroy
	0x1A0: 0x00030FB0, // sys_sigaction
	0x1A1: 0x000313F0, // sys_sigreturn
	0x1A5: 0x000324E4, // sys_getcontext
	0x1A6: 0x00030190, // sys_setcontext
	0x1A7: 0x00031940, // sys_swapcontext
	0x1AD: 0x00031410, // sys_sigwait
	0x1AE: 0x00031B90, // sys_thr_create
	0x1AF: 0x00031FF0, // sys_thr_exit
	0x1B0: 0x000301D0, // sys_thr_self
	0x1B1: 0x00030590, // sys_thr_kill
	0x1B9: 0x000304B0, // sys_ksem_timedwait
	0x1BA: 0x00030150, // sys_thr_suspend
	0x1BB: 0x000311F0, // sys_thr_wake
	0x1BC: 0x000319E0, // sys_kldunloadf
	0x1C6: 0x00030960, // sys__umtx_op
	0x1C7: 0x00030DF0, // sys_thr_new
	0x1C8: 0x000310E0, // sys_sigqueue
	0x1D0: 0x00031190, // sys_thr_set_name
	0x1D2: 0x0002FD50, // sys_rtprio_thread
	0x1DB: 0x00030810, // sys_pread
	0x1DC: 0x000317A0, // sys_pwrite
	0x1DD: 0x00030390, // sys_mmap
	0x1DE: 0x00032320, // sys_lseek
	0x1DF: 0x00030B20, // sys_truncate
	0x1E0: 0x00030B00, // sys_ftruncate
	0x1E1: 0x00030E70, // sys_thr_kill2
	0x1E2: 0x000305D0, // sys_shm_open
	0x1E3: 0x00030080, // sys_shm_unlink
	0x1E6: 0x00031AF0, // sys_cpuset_getid
	0x1E7: 0x000307F0, // sys_ps4_cpuset_getaffinity
	0x1E8: 0x00031CD0, // sys_ps4_cpuset_setaffinity
	0x1F3: 0x00031ED0, // sys_openat
	0x203: 0x00032730, // sys___cap_rights_get
	0x20A: 0x00031B50, // sys_pselect
	0x214: 0x00031900, // sys_regmgr_call
	0x215: 0x00032570, // sys_jitshm_create
	0x216: 0x00032550, // sys_jitshm_alias
	0x217: 0x000314F0, // sys_dl_get_list
	0x218: 0x00031960, // sys_dl_get_info
	0x21A: 0x00030F30, // sys_evf_create
	0x21B: 0x00030C60, // sys_evf_delete
	0x21C: 0x00031010, // sys_evf_open
	0x21D: 0x000301F0, // sys_evf_close
	0x21E: 0x00032280, // sys_evf_wait
	0x21F: 0x00030060, // sys_evf_trywait
	0x220: 0x00030C20, // sys_evf_set
	0x221: 0x000324C0, // sys_evf_clear
	0x222: 0x00030E50, // sys_evf_cancel
	0x223: 0x00031BB0, // sys_query_memory_protection
	0x224: 0x00030310, // sys_batch_map
	0x225: 0x00032460, // sys_osem_create
	0x226: 0x00031920, // sys_osem_delete
	0x227: 0x00031840, // sys_osem_open
	0x228: 0x00030670, // sys_osem_close
	0x229: 0x00031E50, // sys_osem_wait
	0x22A: 0x00030C80, // sys_osem_trywait
	0x22B: 0x00031E10, // sys_osem_post
	0x22C: 0x000304F0, // sys_osem_cancel
	0x22D: 0x00030BE0, // sys_namedobj_create
	0x22E: 0x00031670, // sys_namedobj_delete
	0x22F: 0x00032300, // sys_set_vm_container
	0x230: 0x00031800, // sys_debug_init
	0x233: 0x00030000, // sys_opmc_enable
	0x234: 0x00031E90, // sys_opmc_disable
	0x235: 0x00031C90, // sys_opmc_set_ctl
	0x236: 0x00031A40, // sys_opmc_set_ctr
	0x237: 0x0002FF20, // sys_opmc_get_ctr
	0x23C: 0x00030ED0, // sys_virtual_query
	0x249: 0x0002FFA0, // sys_is_in_sandbox
	0x24A: 0x00031D70, // sys_dmem_container
	0x24B: 0x00031F70, // sys_get_authinfo
	0x24C: 0x0002FE90, // sys_mname
	0x24F: 0x00030430, // sys_dynlib_dlsym
	0x250: 0x00031210, // sys_dynlib_get_list
	0x251: 0x000317E0, // sys_dynlib_get_info
	0x252: 0x00031FD0, // sys_dynlib_load_prx
	0x253: 0x00030530, // sys_dynlib_unload_prx
	0x254: 0x00030270, // sys_dynlib_do_copy_relocations
	0x256: 0x00030250, // sys_dynlib_get_proc_param
	0x257: 0x00031D30, // sys_dynlib_process_needed_and_relocate
	0x258: 0x00031C30, // sys_sandbox_path
	0x259: 0x0002FD30, // sys_mdbg_service
	0x25A: 0x000326D0, // sys_randomized_path
	0x25B: 0x000316D0, // sys_rdup
	0x25C: 0x00032340, // sys_dl_get_metadata
	0x25D: 0x00030F10, // sys_workaround8849
	0x25E: 0x00030730, // sys_is_development_mode
	0x25F: 0x00030770, // sys_get_self_auth_info
	0x260: 0x00032050, // sys_dynlib_get_info_ex
	0x262: 0x000326B0, // sys_budget_get_ptype
	0x263: 0x00031690, // sys_get_paging_stats_of_all_threads
	0x264: 0x00031610, // sys_get_proc_type_info
	0x265: 0x00031570, // sys_get_resident_count
	0x267: 0x00030550, // sys_get_resident_fmem_count
	0x268: 0x00031B70, // sys_thr_get_name
	0x269: 0x0002FD70, // sys_set_gpo
	0x26A: 0x000313B0, // sys_get_paging_stats_of_all_objects
	0x26B: 0x00031BD0, // sys_test_debug_rwmem
	0x26C: 0x000303F0, // sys_free_stack
	0x26E: 0x00030410, // sys_ipmimgr_call
	0x26F: 0x000303D0, // sys_get_gpo
	0x270: 0x000322C0, // sys_get_vm_map_timestamp
	0x271: 0x00030B40, // sys_opmc_set_hw
	0x272: 0x000311B0, // sys_opmc_get_hw
	0x273: 0x00031C10, // sys_get_cpu_usage_all
	0x274: 0x00031070, // sys_mmap_dmem
	0x275: 0x00031A00, // sys_physhm_open
	0x276: 0x000310C0, // sys_physhm_unlink
	0x278: 0x00031710, // sys_thr_suspend_ucontext
	0x279: 0x00030D00, // sys_thr_resume_ucontext
	0x27A: 0x000320E0, // sys_thr_get_ucontext
	0x27B: 0x000309A0, // sys_thr_set_ucontext
	0x27C: 0x0002FE50, // sys_set_timezone_info
	0x27D: 0x00030D20, // sys_set_phys_fmem_limit
	0x27E: 0x00032400, // sys_utc_to_localtime
	0x27F: 0x00032670, // sys_localtime_to_utc
	0x280: 0x00030A80, // sys_set_uevt
	0x281: 0x00032360, // sys_get_cpu_usage_proc
	0x282: 0x00032160, // sys_get_map_statistics
	0x283: 0x000325D0, // sys_set_chicken_switches
	0x286: 0x0002FE70, // sys_get_kernel_mem_statistics
	0x287: 0x000307D0, // sys_get_sdk_compiled_version
	0x288: 0x00030F50, // sys_app_state_change
	0x289: 0x000312D0, // sys_dynlib_get_obj_member
	0x28C: 0x00030EB0, // sys_process_terminate
	0x28D: 0x00030830, // sys_blockpool_open
	0x28E: 0x00032420, // sys_blockpool_map
	0x28F: 0x000314D0, // sys_blockpool_unmap
	0x290: 0x000319C0, // sys_dynlib_get_info_for_libdbg
	0x291: 0x000322E0, // sys_blockpool_batch
	0x292: 0x00032200, // sys_fdatasync
	0x293: 0x00031DF0, // sys_dynlib_get_list2
	0x294: 0x00030330, // sys_dynlib_get_info2
	0x295: 0x000315B0, // sys_aio_submit
	0x296: 0x00030A40, // sys_aio_multi_delete
	0x297: 0x000314B0, // sys_aio_multi_wait
	0x298: 0x00031AB0, // sys_aio_multi_poll
	0x299: 0x00031230, // sys_aio_get_data
	0x29A: 0x00030AA0, // sys_aio_multi_cancel
	0x29B: 0x00031CF0, // sys_get_bio_usage_all
	0x29C: 0x00030890, // sys_aio_create
	0x29D: 0x000323A0, // sys_aio_submit_cmd
	0x29E: 0x00030D40, // sys_aio_init
	0x29F: 0x00032630, // sys_get_page_table_stats
	0x2A0: 0x00032010, // sys_dynlib_get_list_for_libdbg
	0x2A1: 0x00032120, // sys_blockpool_move
	0x2A2: 0x000325F0, // sys_virtual_query_all
	0x2A3: 0x00030790, // sys_reserve_2mb_page
	0x2A4: 0x00031530, // sys_cpumode_yield
	0x2A5: 0x00031780, // sys_wait6
	0x2A6: 0x00031130, // sys_cap_rights_limit
	0x2A7: 0x000302D0, // sys_cap_ioctls_limit
	0x2A8: 0x000316F0, // sys_cap_ioctls_get
	0x2A9: 0x00030CA0, // sys_cap_fcntls_limit
	0x2AA: 0x00030230, // sys_cap_fcntls_get
	0x2AB: 0x00031630, // sys_bindat
	0x2AC: 0x00030450, // sys_connectat
	0x2AD: 0x0002FFC0, // sys_chflagsat
	0x2AE: 0x0002FDD0, // sys_accept4
	0x2AF: 0x00032240, // sys_pipe2
	0x2B0: 0x00030710, // sys_aio_mlock
	0x2B1: 0x00031450, // sys_procctl
	0x2B2: 0x000317C0, // sys_ppoll
	0x2B3: 0x00031550, // sys_futimens
	0x2B4: 0x000300A0, // sys_utimensat
	0x2B5: 0x000320A0, // sys_numa_getaffinity
	0x2B6: 0x00030A20, // sys_numa_setaffinity
	0x2C1: 0x00030BC0, // sys_get_phys_page_size
	0x2C9: 0x00031310, // sys_get_ppr_sdk_compiled_version
	0x2CC: 0x00031590, // sys_openintr
	0x2CD: 0x0002FDB0, // sys_dl_get_info_2
};

// Kernel stack offsets
const OFFSET_KERNEL_STACK_COOKIE                = 0x0000970;
const OFFSET_KERNEL_STACK_SYS_SCHED_YIELD_RET   = 0x0000838;

// Kernel text-relative offsets
const OFFSET_KERNEL_DATA                        = 0x01B40000;
const OFFSET_KERNEL_SYS_SCHED_YIELD_RET         = 0x005638E2;
const OFFSET_KERNEL_ALLPROC                     = 0x04211C18; // data = 0x026D1C18
const OFFSET_KERNEL_SECURITY_FLAGS              = 0x07D81074; // data = 0x06241074
const OFFSET_KERNEL_TARGETID                    = 0x07D8107D; // data = 0x0624107D
const OFFSET_KERNEL_QA_FLAGS                    = 0x07D81098; // data = 0x06241098
const OFFSET_KERNEL_UTOKEN_FLAGS                = 0x07D81100; // data = 0x06241100
const OFFSET_KERNEL_PRISON0                     = 0x03451E00; // data = 0x01911E00
const OFFSET_KERNEL_ROOTVNODE                   = 0x080A5540; // data = 0x06565540

// const OFFSET_KERNEL_PS4SDK						= 0x30E3338;